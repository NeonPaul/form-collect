const isButton = el => /^button|submit|image$/.test(el.type);
const closest = (el, elName) => {
  while (el && el.nodeName.toLowerCase() !== elName) el = el.parentNode;
  return el;
};

export default function collect(form, submitter) {
  const data = [];

  for (field of form.elements) {
    if (
      closest(field, "datalist") ||
      field.disabled ||
      (isButton(field) && field !== submitter) ||
      (/^(radio|checkbox)$/.test(field.type) && !field.checked) ||
      (field.type !== "image" && !field.name)
    ) {
      continue;
    }

    let { name, type } = field;

    if (field.nodeName.toLowerCase() === "input" && type === "image") {
      name = name ? field.name + "." : "";
      data.push([name + "x", "0"]);
      data.push([name + "y", "0"]);
      continue;
    }

    if (/^select-(one|multiple)$/.test(type)) {
      for (option of field.options) {
        if (option.selected && !option.disabled) {
          data.push([name, option.value]);
        }
      }
    } else if (/^(radio|checkbox)$/.test(type)) {
      data.push([name, field.value || "on"]);
    } else if (type === "file") {
      if (field.files.length) {
        field.files.forEach(file => data.push([name, file]));
      } else {
        data.push([name, ""]);
      }
    } else {
      data.push([name, field.value]);
    }

    let dirname;
    if ((dirname = field.getAttribute("dirname"))) {
      data.push([dirname, field.dir === "ltr" ? "ltr" : "rtl"]);
    }
  }

  return data;
};
