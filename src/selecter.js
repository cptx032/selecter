/*
 * Selecter v0.1
 * http://github.com/cptx032/selecter/
 * Released under the MIT License.
 */

function _default_list(defaults, object_dict) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i=0; i < keys.length; i++) {
        if (object_dict[keys[i]] === undefined) {
            object_dict[keys[i]] = defaults[keys[i]];
        }
    }
}

var Selecter = function (jquery_filter, options) {
    this.selection = [];
    var self = this;
    if (!options) {
        options = {};
    }

    _default_list({
        select_class: 'active',
        add_mark: false,
        mark_html: '',
        mark_class: '',
        enable_ctrl: false,
        enable_radio_button: false
    }, options);

    this.options = options;
    this.jquery_filter = jquery_filter;

    $(jquery_filter).each(function (index, elem) {
        var final_html = $(elem).html();

        $(elem).click(function(event) {
            var can_change = true;
            if (options.enable_ctrl && !event.ctrlKey) {
                can_change = false;
            }
            if (self.selection.indexOf(elem) !== -1) {
                if (can_change) {
                    self.unselect(elem, event);
                }
            }
            else {
                if (can_change) {
                    if (options.enable_radio_button) {
                        self.unselect_all();
                    }
                    self.select(elem, event);
                }
            }
        });
    });
};

Selecter.prototype.unselect = function(elem, event) {
    this.selection.splice(this.selection.indexOf(elem), 1);
    $(elem).removeClass(this.options.select_class);

    if (this.options.on_unselect) {
        this.options.on_unselect(elem, event);
    }

    if (this.options.on_unselecting_all) {
        if (this.selection.length === 0) {
            this.options.on_unselecting_all(elem, event);
        }
    }

    if (this.options.add_mark) {
        $(elem).children().filter('.' + this.options.mark_class).remove();
    }

    if (this.options.on_change) {
        this.options.on_change(elem, event, false);
    }
};

Selecter.prototype.select = function(elem, event) {
    if (this.options.validate_selection) {
        if (!this.options.validate_selection(elem, event)) {
            return;
        }
    }

    this.selection.push(elem);
    $(elem).addClass(this.options.select_class);

    if (this.options.on_select) {
        this.options.on_select(elem, event);
    }

    if (this.selection.length === 1) {
        if (this.options.on_at_least_one_selection) {
            this.options.on_at_least_one_selection(elem, event);
        }
    }

    if (this.selection.length === $(this.jquery_filter).length) {
        if (this.options.on_select_all) {
            this.options.on_select_all(elem, event);
        }
    }

    if (this.options.add_mark) {
        $(elem).prepend(this.options.mark_html);
    }

    if (this.options.on_change) {
        this.options.on_change(elem, event, true);
    }
};

Selecter.prototype.unselect_all = function() {
    while (this.selection.length > 0) {
        this.unselect(this.selection[0], null);
    }
};

Selecter.prototype.is_selected = function(elem) {
    return this.selection.indexOf(elem) !== -1;
};

Selecter.prototype.select_all = function(reselect) {
    if (reselect === undefined) {
        reselect = false;
    }
    var self = this;
    $(this.jquery_filter).each(function (index, elem) {
        if (self.is_selected(elem)) {
            if (reselect) {
                self.select(elem, null);
            }
        }
        else {
            self.select(elem, null);
        }
    });
};