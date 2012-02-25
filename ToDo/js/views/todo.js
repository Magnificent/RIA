define([
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone',   // lib/backbone/backbone
  'postCollection',
  'postModel'
], function ($, _, Backbone, postCollection, postModel) {
    todoListView = Backbone.View.extend({
        el: $("#todolistdiv"),
        initialize: function (options) {
            //skapar tre olika templates
            this.ulTemplate = _.template('<ul id="todolist"></ul>');
            this.formTemplate = _.template('<input id="new-todo" placeholder="Skapa ny post" type="text" /><span class=priospan>Ange prioritet: <select id="prio"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option></select><button id="submit">Spara</button></span>');
            this.sortTemplate = _.template('<div id="sortDiv"><span id="sortByAlph" class="sort">Sortera i bokstavsordning</span><span id="sortByPrio" class="sort">Sortera efter prioritet</span><br /><span id="sortByTag" class="sort">Sortera efter tagg</span><span id="filterTags" class="sort">Visa bara poster med vald tagg</span></div>');
            //binder alla funktioner
            _.bindAll(this, 'render', 'addAll', 'addOne', 'newPost');
            this.collection.bind('add', this.addOne);

        },
        render: function () {
            //l�gger till templatsen
            $(this.el).html(this.formTemplate);
            $(this.el).append(this.sortTemplate);
            $(this.el).append(this.ulTemplate);
            //l�gger till all data
            this.addAll();
            return this;
        },
        addAll: function () {
            this.collection.each(this.addOne);
        },
        addOne: function (model) {
            //skapar nytt li-element inneh�llandes en posts attribut
            view = new TodoListViewEntry({ model: model });
            view.render();
            //f�r att den nya posten ska l�ggas �verst i listan s� plockas firstchild ut och posten l�ggs in f�re den.
            var todolist = document.getElementById("todolist");
            var firstchild = todolist.firstChild;
            todolist.insertBefore(view.el, firstchild);
            model.save();
        },
        newPost: function (e) {
            //kollar n�r posten skapades
            var currentTime = new Date();
            var month = currentTime.getMonth() + 1;
            var fulltime = currentTime.getDate() + "/" + month + " " + currentTime.getHours() + ":" + currentTime.getMinutes();
            //l�ser av satt prioritet och konverterar till int
            var prio = parseInt(this.$("#prio").val());
            //skapar och l�gger in posten i collection
            this.collection.add(new postModel({ Text: this.$("#new-todo").val(), Prio: prio, Date: fulltime, Tag: this.getTag() }));
            this.$("#prio").val("");
            this.$("#new-todo").val("");
        },
        //funktion som h�mtar ut vilken tagg som �r vald, �r ingen vald s� blir det None
        getTag: function () {
            if ($("#taglist input:radio:checked").val() == undefined) {
                return "None";
            }
            return $("#taglist input:radio:checked").val();
        },
        events: {
            "click #submit": "newPost",
            "click #sortByPrio": "sortByPrio",
            "click #sortByTag": "sortByTag",
            "click #sortByAlph": "sortByName",
            "click #filterTags": "filterTags"
        },
        sortByPrio: function () {
            this.majorSortFunction("Prio");
        },
        sortByTag: function () {
            this.majorSortFunction("Tag");
        },
        sortByName: function () {
            this.majorSortFunction("Text");

        },
        //funktion som sorterar listan efter olika typer
        majorSortFunction: function (type) {
            var model = this.collection.models;
            var sort = this.collection.sortBy(function (model) {
                //�r typen Prio s� sorteras den i omv�nd ordning s� h�gst prio hamnar h�gst upp
                if (type == "Prio")
                    return -model.get(type);
                else {
                    var str = model.get(type);
                    str = str.toLowerCase();
                    str = str.split("");
                    return str;
                }
            });
            //rensar den gamla listan..
            $("#todolist").html("");
            //..och loopar sedan igenom den nya listan och l�gger in i #todolist
            _.each(sort, function (model) {
                view = new TodoListViewEntry({ model: model });
                view.render();
                $("#todolist").append(view.el);
                model.save();
            });
        },
        //fuktion som filtrerar ut poster med en viss tagg
        filterTags: function () {
            var model = this.collection.models;
            //�r ingen tagg vald s� ska poster med None som tagg visas
            var selected = $("#taglist input:radio:checked").val();
            if (selected == undefined)
                selected = "None";
            var filter = this.collection.filter(function (model) {
                return model.get("Tag") == selected;
            });
            //rensar den gamla listan..
            $("#todolist").html("");
            //..och loopar sedan igenom den nya listan och l�gger in i #todolist
            _.each(filter, function (model) {
                view = new TodoListViewEntry({ model: model });
                view.render();
                $("#todolist").append(view.el);
                model.save();
            });
        }
    });
    return todoListView;
});