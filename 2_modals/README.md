We take that directive idea a little further and split behavior we want to attach to a tag accross several directives. Namely:

- A generic `<fa-modal>` directive that ensures that only a single modal can be opened at a time.

- Specific directives for each modal: `<fa-settings>` and `<fa-composer>`.

Note that at this point, we're talking about multiple directives cooperating in a single tag.

Like in the previous examples, all `<fa-modal>` are connected with a global service that tracks which modal is currently open. Modules requiring that service can open a modal.

Splitting code accross multiple cooperating directives is the way I do inheritance in AngularJS (traditional prototypal inheritance is already used to chain scopes, so I had to find something else).

Directives can expose a controller that can be used by cooperating directives. In my example, the controller is used to configure the behavior of the modal (can it be cancelled by clicking outside ?). This is done with `require`.