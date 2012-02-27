define([
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone'    // lib/backbone/backbone
], function ($, _, Backbone) {
    TodoListViewEntry = Backbone.View.extend({
        tagName: 'li',
        initialize: function (options) {
            //en template inneh�llandes text-element f�r posten, ett edit-f�lt(dolt fr�n b�rjan), en prio-span, 
            //en prio-selectlista f�r redigering, datum-span, en tagg-span, en ta bort-span, 
            //en redigera-span och en done-span (vid redigering)
            this.template = _.template("<p class='text'></p><span class='prio'></span><input type='text' class='editText' value='' /><select class='editPrio'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option></select><span class='createdAt'>Skapad " + this.model.get('Date') + "</span><span class='tag'></span><span class='remove'> TA BORT</span><span class='edit'> REDIGERA</span><span class='done hidden'> DONE</span>");
            _.bindAll(this, "remove", "handleDelete", "edit");
            options.model.bind('change', this.render, this);
            options.model.bind('destroy', this.remove);
        },
        render: function () {
            //l�gger till den nya li-taggen som f�r med datan till modellen
            $(this.el).html(this.template(this.model.toJSON));
            //skriver ut text f�r postens inneh�ll, prio och taggen
            this.setText();
        },
        events: {
            "click .remove": "handleDelete",
            "click .edit": "edit",
            "click .done": "doneUpdate"
        },
        remove: function (e) {
            $(this.el).remove();
        },
        handleDelete: function (e) {
            this.model.destroy();
        },
        //funktion som s�tter text f�r posten, prio och taggen
        setText: function () {
            var text = this.model.get("Text");
            var prio = this.model.get("Prio");
            var tag = this.model.get("Tag");
            this.$(".text").text(text);
            this.$(".prio").text("Prioritet: "+prio);
            this.$(".tag").text("Tag: "+tag);
        },
        edit: function (e) {
            //vid edit ska man d�lja och visa olika element. plockar f�rst ut de beh�vliga elementen
            this.textspan = this.el.childNodes[0];
            this.selector = this.el.childNodes[1];
            this.inputfield = this.el.childNodes[2];
            this.prioselect = this.el.childNodes[3];
            this.removespan = this.el.childNodes[6];
            this.editspan = this.el.childNodes[7];
            this.donespan = this.el.childNodes[8];
            //d�ljer sedan vissa och visar vissa genom att ta bort och l�gga till klassen hidden
            $(this.textspan).addClass("hidden");
            $(this.selector).addClass("hidden");
            $(this.removespan).addClass("hidden");
            $(this.editspan).addClass("hidden");
            //s�tter postens text i den input-tagg som nu visas
            this.inputfield.setAttribute("value", this.textspan.innerHTML);
            $(this.inputfield).focus();
            $(this.inputfield).addClass("editing");
            $(this.prioselect).addClass("editing");
            $(this.donespan).removeClass("hidden");
        },
        doneUpdate: function (e) {
            //n�r redigeringen �r klar s� sparas uppdateringarna och klasser �ndras igen
            this.model.save({ Text: $(this.inputfield).val(), Prio: $(this.prioselect).val() });
            $(this.inputfield).removeClass("editing");
            $(this.textspan).removeClass("hidden");
            $(this.selector).removeClass("hidden");
            $(this.removespan).removeClass("hidden");
            $(this.editspan).removeClass("hidden");
            $(this.donespan).removeClass("hidden");

        }
    });
    return TodoListViewEntry;
});