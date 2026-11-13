/*
 * /admin photo pickers: show the chosen photo straight away, and shrink big
 * ones in the browser before sending. The server accepts at most 4 MB per
 * request, and phone photos are often bigger. The server re-processes every
 * upload anyway (rotation, size, removing location data); this only keeps
 * the upload small. Without JavaScript the form still works for photos under
 * 4 MB.
 */
(function () {
  var MAX_BYTES = 3.5 * 1024 * 1024;
  var MAX_SIDE = 2400;

  function preview(input, file) {
    var slot = document.querySelector('[data-preview-for="' + input.id + '"]');
    if (!slot) return;
    var img = document.createElement("img");
    img.alt = "Chosen photo (not saved yet)";
    img.className = slot.className.replace("border-dashed", "").replace("grid", "block");
    img.style.objectFit = input.dataset.photo === "logo" ? "contain" : "cover";
    img.src = URL.createObjectURL(file);
    img.setAttribute("data-preview-for", input.id);
    slot.replaceWith(img);
  }

  function shrink(file, kind) {
    return new Promise(function (resolve) {
      if (file.size <= MAX_BYTES || !window.createImageBitmap) return resolve(file);
      createImageBitmap(file, { imageOrientation: "from-image" })
        .then(function (bitmap) {
          var scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
          var canvas = document.createElement("canvas");
          canvas.width = Math.round(bitmap.width * scale);
          canvas.height = Math.round(bitmap.height * scale);
          canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          var type = kind === "logo" ? "image/png" : "image/jpeg";
          canvas.toBlob(
            function (blob) {
              if (!blob) return resolve(file);
              var name = file.name.replace(/\.[^.]+$/, "") + (type === "image/png" ? ".png" : ".jpg");
              resolve(new File([blob], name, { type: type }));
            },
            type,
            0.85
          );
        })
        .catch(function () {
          resolve(file);
        });
    });
  }

  document.addEventListener("change", function (e) {
    var input = e.target;
    if (!(input instanceof HTMLInputElement) || input.type !== "file" || !input.dataset.photo) return;
    var file = input.files && input.files[0];
    if (!file) return;
    preview(input, file);
    // Hold the Save buttons while the photo is being shrunk.
    var buttons = input.form ? input.form.querySelectorAll("button[type=submit]") : [];
    buttons.forEach(function (b) { b.disabled = true; });
    shrink(file, input.dataset.photo).then(function (small) {
      buttons.forEach(function (b) { b.disabled = false; });
      if (small === file || typeof DataTransfer === "undefined") return;
      var dt = new DataTransfer();
      dt.items.add(small);
      input.files = dt.files;
    });
  });
})();
