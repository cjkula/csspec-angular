CSSpec Angular
==============

WIP!

Quick gratification
-------------------

    npm install
    npm start
    ...
    grunt  // in a separate terminal window

Go to http://localhost:8000/csspec/runner.html and open the Console to see the tests pass. Open `app/sass/style.scss` and comment out or change line 13 and/or 15. Wait for SASS to be recompiled and reload the page. See test(s) fail.

The tests are defined in `css-tests/suite.csspec`, which is compiled to SASS in `css-tests/suite-csspec.sass` by csspec-grunt and then to CSS in `css-tests/suite-csspec.css`. Edit the test suite to match the changes made to `style.scss` in order to make the tests pass again.

Language
--------

See the csspec-grunt NPM project for information on preprocessor syntax.

This project implements a rough-and-ready client-side test runner, with the intention of integrating into the Karma and Protractor workflows.

CSSpec leverages existing SASS/CSS (plus a dash of HAML) tools to deliver a browser-parseable, JavaScript-traverseable test suite build on the same structural abstractions as SASS/CSS. This is possible because CSS is primarily concerned with distinct states of representation rather than the programmatic transitions between them, and so a test suite does not need much in the way of program flow control.

Ideology (just sayin')
----------------------

By adopting a dialect of SASS/CSS as the abstract test framework, CSSpec aims to provide a tool that is understandable and useable by the coders who in fact write stylesheets.

By adding code-based specifications and regression testing to the stylesheet development workflow, modularity and refactoring become more achievable objectives for CSS, as well as the possibility that more styling concerns might be moved to the style layer, freeing up HTML to be a purer semantic representation of the underlying content.

License
-------

### CSSpec components

The MIT License

Copyright (c) 2015 Christopher Kula

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


### AngularJS components

This project framework is a fork of https://github.com/angular/angular-seed:

The MIT License

Copyright (c) 2010-2014 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

