/********************************************
 * Id: haat5385
 *
 * Compile: gcc -Wall
 * Run: ./a.out input.txt
 *
 * Expanded Lexer: Character literals and C-style comments
 *********************************************/

#define MAXTOKEN 256

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Function prototypes
int tokenize(char *line, int length, char *comment_buffer, int *comment_index, int *in_multiline_comment);
void lex_token(char *line, int start, int end, const char *type);
void print_token(char *token, const char *type);
int is_comment_start(const char *line, int pos);
int is_comment_end(const char *line, int pos);
int is_char_literal(const char *line, int pos);

int main(int argc, char *argv[])
{
   if (argc < 2) {
      printf("Please specify input file.\n");
      printf("%s ", argv[0]);
      return 1;
   }

   FILE *fp;
   char *line = NULL;
   size_t len = 0;
   ssize_t read;

   char comment_buffer[1024] = {0};
   int comment_index = 0;
   int in_multiline_comment = 0;

   fp = fopen(argv[1], "r");
   if (fp == NULL) {
      printf("Error: Could not open file %s\n", argv[1]);
      exit(EXIT_FAILURE);
   }

   while ((read = getline(&line, &len, fp)) != -1) {
      tokenize(line, (int)read, comment_buffer, &comment_index, &in_multiline_comment);
   }

   fclose(fp);
   if (line) {
      free(line);
   }
   exit(EXIT_SUCCESS);
}

/* Break the string down into tokens */
int tokenize(char *line, int length, char *comment_buffer, int *comment_index, int *in_multiline_comment)
{
   int start = 0;
   int end = 0;

   while (start < length) {
      /* Skip leading spaces */
      while (start < length && isspace(line[start])) {
         start++;
      }

      /* Check for comments */
      if (is_comment_start(line, start)) {
         /* Find the end of the comment */
         int first_line = 1;
         end = start + 2;

         while (end < length && !is_comment_end(line, end)) {
            end++;
         }
         if (end < length) {
            end += 2;
            lex_token(line, start, start + 2, "Comment");
            char *token = strtok(line + start + 2, "\n");

            while (token != NULL) {
               char formatted_line[MAXTOKEN];
               snprintf(formatted_line, MAXTOKEN, " * %s", token);
               print_token(formatted_line, "Comment");
               token = strtok(NULL, "\n");
            }

            print_token(" */", "Comment"); // Closing comment
         } 
         else {
            // Handle the case where the comment is not closed
            strncpy(comment_buffer, line + start, length - start);
            *comment_index = length - start;
            *in_multiline_comment = 1; // Continue on the next line
            return 0; // Stop processing this line
         }
         start = end; // Move past the comment
         continue;
      }

      /* Check for strings */
      if (line[start] == '"') {
         end = start + 1;
         while (end < length && line[end] != '"') {
            end++;
         }
         if (end < length) {
            end++;
         }
         lex_token(line, start, end, "Token");
         start = end;
         continue;
      }

      /* Check for character literals */
      if (is_char_literal(line, start)) {
         end = start + 1;

         /* Move end to the closing single quote or end of line */
         while (end < length && (line[end] != '\'' || line[end - 1] == '\\')) {
            end++;
         }
         if (end < length) {
            end++;
         }
         lex_token(line, start, end, "Token");
         start = end;
         continue;
      }

      /* Handle regular tokens (not strings, comments, or char literals) */
      end = start;
      while (end < length && !isspace(line[end]) && line[end] != '/' && line[end] != '"') {
         end++;
      }

      if (end > start) {
         lex_token(line, start, end, "Token");
      }

      /* Move to the next token */
      start = end;
   }

   return 0;
}

/* Assign meaning to tokens */
void lex_token(char *line, int start, int end, const char *type)
{
   char token[MAXTOKEN];

   /* Copy the token to a buffer and null-terminate it */
   strncpy(token, &line[start], end - start);
   token[end - start] = '\0';

   /* Print the token */
   print_token(token, type);
}

/* Print the token or comment */
void print_token(char *token, const char *type)
{
   if (strcmp(type, "Comment") == 0) {
      printf("Comment: %s\n", token);
   }
   else {
      printf("Token: %s\n", token);
   }
}

/* Check if we are at the start of a comment */
int is_comment_start(const char *line, int pos)
{
   return (line[pos] == '/' && line[pos + 1] == '*');
}

/* Check if we are at the end of a comment */
int is_comment_end(const char *line, int pos)
{
   return (line[pos] == '*' && line[pos + 1] == '/');
}

/* Check if we are at the start of a character literal */
int is_char_literal(const char *line, int pos)
{
   return (line[pos] == '\'' && line[pos + 2] == '\'');
}
