from bs4 import BeautifulSoup
import requests


def main():

    html_text = requests.get('https://www.padelution.com/events').text

    soup = BeautifulSoup(html_text, 'lxml')

    kisat = soup.find_all('tr', class_ = 'table-row lg:hidden bg-gray-900')

    for kisa in kisat:
        try:
            kisanimi = kisa.find('p', class_ = 'text-brand-base hover:text-brand-dark').text
            kisapaikka = kisa.find('span', class_ = 'text-gray-500').text
            paikkakunta = kisa.find('div', class_ ='text-gray-500').text

            if paikkakunta == "Tampere" or paikkakunta == "Nokia" or \
            paikkakunta == "Kuopio":
                if not "Naiset" in kisanimi:
                    print()
                    print(kisapaikka)
                    print(kisanimi)
                    print(paikkakunta)
                    print()

        except AttributeError:
            pass
    

if __name__ == "__main__":
    main()

