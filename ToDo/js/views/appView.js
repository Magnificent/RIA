define([
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone',    // lib/backbone/backbone
  'baseView',
  'todoView',
  'TodoListViewEntry',
  'tagView',
  'tagListViewEntry'
], function ($, _, Backbone, baseView, todo, TodoListViewEntry, tagListView, tagListViewEntry) {
    appView = baseView.extend({
        el: $("#content"),
        initialize: function (options) {
            //tar emot lagrad data till de b�da klasserna          
            this.todoList = options.todoPosts;
            this.tagList = options.todoTags;
        },
        render: function () {
            //skapar de b�da vyerna och renderar dem f�r att sedan l�gga till dem i el
            todoListView = new todo({ collection: this.todoList });
            tagView = new tagListView({ collection: this.tagList });
            todoListView.render();
            tagView.render();
            this.$(this.el).append(todoListView.el);
            this.$(this.el).append(tagView.el);
        }
    });
    return appView
});