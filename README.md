# Todo
�Skapa lista �ver dina saker som beh�vs g�ras. S�tt prioritet och taggar p� dina inl�gg f�r att l�tt kunna sortera dem. Denna app �r byggd av Erik Nilsson. Detta �r version 1.0.0.�

Anv�nda bibliotek
�ToDo anv�nder sig av Backebone.js och Require.js som grund. �ven Underscore.js, jQuery, Order.js  och Backebone-Localstorage anv�nds p� flera st�llen.�

## Navigera i koden
�Main.js - Laddar in alla filer och startar ig�ng appen.�
�App.js - Startar ig�ng Router.js.�
�Router.js - Router f�r appen som laddar in appview.�
�Boilerplate.js - En mall som anv�nds som grund f�r varje ny .js-fil.�

�Models/post.js - Modell f�r post. S�tter default-v�rden.�
�Models/tag.js - Modell f�r tag. S�tter default-v�rden.�

�Collections/posts.js - Collection f�r post. Skapar en localStorage f�r att spara data.�
Collections/tags.js - Collection f�r tag. Skapar en localStorage f�r att spara data.�

�Views/appView.js - Grund-vy som skapar upp de andra �under-vyerna�.�
�Views/todo.js - Skapar delen d�r alla poster hanteras. Inneh�ller tre templates, en ul-lista, en som inneh�ler en input, en select f�r att s�tta prioritet och en submitknapp och en template som inneh�ller spans som anv�nds som knappar till sortering.�
�Views/TodoListViewEntry.js - Skapar ett nytt li-element som l�ggs i ul-listan som skapades i todo.js. Inneh�ller texten f�r posten, satt prioritet, tagg och n�r den �r skapad. �ven knappar f�r att ta bort detta element och f�r att redigera text och prioritet. �
�Views/tagList.js - Skapar delen som hanterar taggar. Inneh�ller tv� templates, ett formul�r som ska inneh�lla inputs med alla taggar som finns och en template som har ett input-f�lt och en submit.�
�Views/TagListViewEntry.js - Skapar en ny input med typen radio button och en span som anger namn p� taggen. L�ggs i formul�ret som finns i tagList.js.�
�Views/baseView.js - En basvy som appView.js bygger p�.�

## Installation:
�Ladda bara ner koden och k�r index.html. �