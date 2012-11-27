var w = window,
    r = ruqq,
    prfx = r.info.cssprefix,
    vendorPrfx = r.info.prefix,
    getTransitionEndEvent = function() {
        var el = document.createElement('fakeelement'),
            transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MSTransition': 'msTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            },
            event = null;

        for (var t in transitions) {
            if (el.style[t] !== undefined) {
                event = transitions[t];
                break;
            }
        }

        getTransitionEndEvent = function() {
            return event;
        };
        
        el = null;
        transitions = null;
        return getTransitionEndEvent();
    },
    I = {
        prop: prfx + 'transition-property',
        duration: prfx + 'transition-duration',
        timing: prfx + 'transition-timing-function',
        delay: prfx + 'transition-delay'
    };