import bcrypt
import _mysql_connector
from getpass import getpass #Hiding info

def validate(prompt, min, max):
        
        while True:
            if "password" in prompt.lower():

                value = getpass(prompt)
            else:

                value = input(prompt)

            if (len(value) >= min and len(value) <= max):

                return value
            else:

                print(f"Input must be between {min} and {max}. Try again")

                


def main():

    plainPassword = validate("Enter a Password: ", 8, 50).encode("utf-8")

    salt = bcrypt.gensalt()

    hashedPassword = bcrypt.hashpw(plainPassword, salt)




