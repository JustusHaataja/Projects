import telebot
import random

from nltk.tokenize import word_tokenize


KEY = '6545428411:AAEeSr7hIoZH9v8RRg-C8cgBXOMpBAwuDbU'

# Messages
greetings = ["moro", "morjesta", "hellou"]
goodbyes = ["hei", "näkemiin", "hyvästi"]
age = ["ikä"]
joke = ["vitsi"]

# Replies
greetings_reply = ["Räyh", "Wuh", "Hau"]
goodbyes_reply = ["Auuuuu", "Wooofff", "* fart noise *"]
age_replies = ["Olen 1-vuotias", "1 Wee au auuu", ]
joke_reply = ["Mitä insinööri sanoi tavatessaan tradenomin?             Big Mac kokiksella."]


def main():

    bot = telebot.TeleBot(KEY)

    @bot.message_handler(func=lambda message: True)
    def handle_message(message):
        # Get the text of the received message
        text = message.text

        # Tokenize the text into words
        words = word_tokenize(text, language='finnish')

        if words[0] == "UoleviKoira":
            del words[0]
            print(words)

            # Create rules or conditions to select a reply based on the tokenized words
            reply = select_reply(words)

            # Reply with the selected reply
            bot.send_message(message.chat.id, reply)

    def select_reply(words):

        for word in words:
            
            if word in greetings:
                reply = random.choice(greetings_reply)
                return reply
            
            if word in goodbyes:
                reply = random.choice(goodbyes_reply)
                return reply
            
            if word in age:
                reply = random.choice(age_replies)
                return reply
            
            if word in joke:
                reply = random.choice(joke_reply)
                return reply
            
            else:
                return "Enpä ymmärtänyt, sanoppa uuestaan"
    
    
    bot.polling()

if __name__ == "__main__":
    main()

"""
    @bot.message_handler(func=lambda message: message.text.lower() in greetings)
    
    def greet(message):
        response = random.choice(greetings_reply)
        bot.send_message(message.chat.id, response)

    @bot.message_handler(func=lambda message: message.text.lower() in goodbyes)
    
    def greet(message):
        response = random.choice(goodbyes_reply)
        bot.send_message(message.chat.id, response)
    """