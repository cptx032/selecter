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
    this.__selection = [];
    var self = this;
    $(jquery_filter).each(function (index, elem) {
        var final_html = $(elem).html();

        if (!options) {
            options = {};
        }

        _default_list({
            select_class: 'active',
        }, options);

        $(elem).click(function(event) {
            if (self.__selection.indexOf(elem) !== -1) {
                self.__selection.splice(self.__selection.indexOf(elem), 1);
                $(elem).removeClass(options.select_class);

                if (options.on_unselect) {
                    options.on_unselect(elem, event);
                }

                if (options.on_unselecting_all) {
                    if (self.__selection.length === 0) {
                        options.on_unselecting_all(elem, event);
                    }
                }
            }
            else {
                self.__selection.push(elem);
                $(elem).addClass(options.select_class);

                if (options.on_select) {
                    options.on_select(elem, event);
                }

                if (self.__selection.length === 1) {
                    if (options.on_at_least_one_selection) {
                        options.on_at_least_one_selection(elem, event);
                    }
                }

                if (self.__selection.length === $(jquery_filter).length) {
                    if (options.on_select_all) {
                        options.on_select_all(elem, event);
                    }
                }
            }

            if (options.on_change) {
                options.on_change(elem, event);
            }
        });
    });
};