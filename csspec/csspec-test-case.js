window.CSSpec = window.CSSpec || {};

(function($, _) {
  var module = CSSpec;

  CSSpec.testCase = function(ruleSelector, cssRule) {
    this.ruleSelector = ruleSelector;
    this.cssRule = cssRule;
    this.parse();
  }

  module.testCase.prototype = {

    parse: function() {
      var self = this;

      this.clauses = _.map(this.ruleSelector.split(/\s+/), function(selector) {

        var clause = { 
          selector: selector,
          identifiers: selector.match(/[.#:]*[^.#:]+/g),
          element: [],
          group: [],
          state: [],
          requirement: []
        }

        _.each(clause.identifiers, function(identifier) {
          var type = module.identifierType(identifier);

          // if a -when clause is earlier in the selector
          // then anything but an -it clause
          // is part of the state definition
          if (type === 'selector') {
            type = clause.state.length > 0 ? 'state' : 'element';
          } else if (type === 'requirement') {
            self.requirement = identifier;
          }

          clause[type].push(identifier);

        });

        // validate selectors, to catch things like
        // conflicting ids or psuedo-states on the same element

        return clause;

      });

    },

    exec: function() {
      var self = this,
          expectedAttrs = this.cssRule.style,
          $target = this.prepareTarget();
      
      this.failures = [];
      this.result = expectedAttrs.length > 0 ? 'pass' : 'pending';
      this.targetCount = $target.length;

      if (this.targetCount > 0) {
      
        _.each(expectedAttrs, _.bind(function(attrName) {
          var evaluation = self.evaluateCriterion($target, attrName, expectedAttrs[attrName]);
          if (evaluation.result === 'fail') {
            self.result = 'fail';
            self.failures.push(evaluation.report);
          }
        }, this));

      } else {
        this.result = 'inapplicable';
      }

      this.rollback();
    },

    prepareTarget: function() {
      var self = this,
          $el = module.$fixture;
      this.rollbackStack = [];
      this.applyContent($el);
      _.each(this.clauses, function(clause) {
        $el = $(clause.element.join(), $el);
        self.applyContent($el);
        self.applyClauseSelectors(clause, $el);
      });
      return $el;
    },

    applyContent: function($el) {
      var content = $el.css('content'),
          saveContent;

      if (content) {

        content = content.match(/^\s*(\'(.*)\'|\"(.*)\")\s*$/)[2];
        saveContent = $el.html();
        if (content !== saveContent) {

          $el.html(content);

          this.rollbackStack.push(function() {
            $el.html(saveContent);
          });

        }
      }

    },

    applyClauseSelectors: function(clause, $el) {
      var self = this;
      _.each(clause.group.concat(clause.state), function(selector) {
        self.applySelector(selector, $el);
      });
    },

    applySelector: function(selector, $el) {
      var matches = selector.match(/^([.]+)(.+)$/),
          prefix = matches[1],
          identifier = matches[2],
          saveIdentifier;

      switch (prefix) {

        case '.':
          if (!$el.hasClass(identifier)) {
            $el.addClass(identifier);
            this.rollbackStack.push(function() {
              $el.removeClass(identifier);
            });
          }
          break;

        case '#':
          saveIdentifier = $element.attr('id');
          if (identifier !== saveIdentifier) {
            $element.attr('id', identifier);
            this.rollbackStack.push(function() {
              $element.attr('id', saveIdentifier);
            });
          }
          break;

      }

    },

    // undo applied states
    rollback: function() {
      while (this.rollbackStack && this.rollbackStack.length > 0) {
        this.rollbackStack.pop()();
      }
    },

    evaluateCriterion: function($target, attrName, expectedValue) {
      var actual = this.resolveAttribute($target, attrName);
      if (actual === expectedValue) return { result: 'pass' };
      return {
        result: 'fail',
        report: 'expected :' + attrName + 
                ' to be ' + expectedValue +
                ' but was ' + actual + '.'
      }
    },

    resolveAttribute: function($target, attrName) {
      return $target.css(attrName);
    },

    report: function() {
      var label = this.result === 'pass' ? 'SUCCESS' : (this.result === 'fail' ? 'FAILURE' : 'PENDING');
      
      console.log(label + ': ' + this.description());
      _.each(this.failures, function(failure) {
        console.log('    ' + failure);
      })
    },
  
    description: function() {
      var sections =
        _.flatten(_.map(this.clauses, function(clause) {
          return _.map(clause.group, function(identifier) {
              return module.testClassToNaturalLanguage(identifier, true);
            }).concat(
              _.compact(_.map(clause.state, function(identifier) {
                return module.testClassToNaturalLanguage(identifier);
              }))
            );
        }));

      sections.push(module.testClassToNaturalLanguage(this.requirement, true));
      return sections.join(' ');
    }

  };

})(jQuery, _);
