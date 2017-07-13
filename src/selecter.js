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
            add_check: true,
            check_position: 'left',
            check_html: ' <input type="checkbox"> '
        }, options);

        if (options.add_check) {
            if (options.check_position === 'left') {
                final_html = options.check_html + final_html;
            }
            else if (options.check_position === 'right') {
                final_html = final_html + options.check_html;
            }
        }

        $(elem).html(final_html);

        $(elem).children().filter(':checkbox').each(function(index, check_elem) {
            $(check_elem).change(function (event) {
                if (check_elem.checked) {
                    self.__selection.push(check_elem);

                    if (options.on_selection) {
                        options.on_selection(self, check_elem, elem);
                    }

                    if (options.on_at_least_one_selection) {
                        if (self.__selection.length === 1) {
                            options.on_at_least_one_selection(self, check_elem, elem);
                        }
                    }
                }
                else {
                    if (self.__selection.indexOf(check_elem) !== -1) {
                        self.__selection.splice(self.__selection.indexOf(check_elem), 1);
                    }

                    if (options.on_unselection) {
                        options.on_unselection(self, check_elem, elem);
                    }

                    if (options.on_unselecting_all) {
                        if (self.__selection.length === 0) {
                            options.on_unselecting_all(self, check_elem, elem);
                        }
                    }
                }
            });
        });
    });
};