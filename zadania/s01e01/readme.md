
# jak uruchomic zadanie
** trzeba miec pelna sciezke do pliku ze wzgledu na uzycie .env z glownego katalogu projektu 
** wszystkie pliki w folderze zadania/s01e01

0. askAIfunc.ts - wysyla informacje do AI
1. OpenAIService.ts - klasa do komunikacji z AI
2. readLoginPage.ts - pobiera informacje z loginu aby znac pytanie do AI
3. sendLogin.ts - loguje sie do systemu i wysyla odpowiedz AI
4. submitonly.ts - to to samo co sendLogin i powinno dzialac tak samo, uzywane bylo do testow i poszukiwania bledu ktory okazal sie byc zlym typem portokolu HTTP zamiast https 

** aby uruchomic zadanie nalezy uruchomic bun .\zadania\s01e01\submitonly.ts lub bun .\zadania\s01e01\sendLogin.ts
