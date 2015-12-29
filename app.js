var todo = {};

// Todo class has two properties.
todo.Todo = function(data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
};

// TodoList class is list of Todos.
todo.TodoList = Array;

// Define the view model.
todo.vm = {
    init: function() {
        todo.vm.list = new todo.TodoList();

        todo.vm.description = m.prop('');

        todo.vm.add = function(description) {
            if (description()) {
                todo.vm.list.push(new todo.Todo({description: description()}));
                todo.vm.description("");
            }
        };
    }
};

// Controller
todo.controller = function() {
    todo.vm.init()
}

// View
todo.view = function() {
    return m("html", [
        m("body", [
            m("input", {onchange: m.withAttr("value", todo.vm.description), value: todo.vm.description()}),
            m("button", {onclick: todo.vm.add}, "Add"),
            m("table", [
                todo.vm.list.map(function(task, index) {
                    return m("tr", [
                        m("td", [
                            m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), checked: task.done()})
                        ]),
                        m("td", {style: {textDecoration: task.done() ?"line-through" : "none"}}, task.description()),
                    ])
                })
            ])
        ])
    ]);
};

// Init application.
m.mount(document, {controller: todo.controller, view: todo.view});
