# Form Collect

Collects form data in the same way specified by WHATWG; this data should be the same
as the data that would get submitted to the server by a plain form submission.

This means you can gracefully degrade your js form submission, knowing the front
and back end will recieve the same data sets.

## How to use

```sh
npm install form-collect
```

```javascript
const collect = require('form-collect');

// This is the form you want to collect data from
const form = document.querySelector('#my-form');
// Optional; this is the button that was clicked to submit the form
const submitter = document.querySelector('#submit-button');

const data = collect(form, submitter);
```

The data object that is returned is an array of entries, each entry being
a two-element array, of key/name and value. This is because the form may have
multiple inputs with the same name, creating mutliple entries with the same key,
and this is the most generic way of handling such a case in Javascript.

An example for form with one text input called `text_input` and two checkboxes
both with the name `checkbox[]`. Of course field naming convention is totally
up to you; the brackets on the end are optional.

```json
[
  ["text_input", "input value"],
  ["checkbox[]", "checked_value_1"],
  ["checkbox[]", "checked_value_2"],
]
```

## Known issues

I need to double check to make sure it's rigorous, but for certain I know
that image input don't capture your mouse coördinates currently. Instead it
submits (0,0) as the x and y values.
