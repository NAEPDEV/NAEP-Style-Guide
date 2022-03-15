var versionsArray = [
  '1.2.2',
  '1.2.1',
  '1.1.1',
  '1.0.1',
  '1.0.0',
  '0.2.1',
  '0.2.0',
]; // prepend this with the latest version
var observer;

$(document).ready(function () {
  var pathArray = window.location.href.split('/');
  var shortPath =
    '/' +
    pathArray[pathArray.length - 2] +
    '/' +
    pathArray[pathArray.length - 1];
  if (!pathArray[3].match(/[0-9]+\.[0-9]+\.[0-9]+/g)) {
    // window.location.href = window.location.origin + "/" + versionsArray[0] + shortPath;
  }
});

function waitForElement(selector) {
  return new Promise(function (resolve, reject) {
    var element = document.querySelector(selector);

    if (element) {
      resolve(element);
      return;
    }

    observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var nodes = Array.from(mutation.addedNodes);
        for (var node of nodes) {
          if (node.matches && node.matches(selector)) {
            observer.disconnect();
            resolve(node);
            return;
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}

// waitForElement("#versions").then(function (element) {
//     observer.disconnect();

//     $("#versions").html("")
//     for (let version in versionsArray) {
//         $("#versions").append('<option value="' + versionsArray[version] + '">' + versionsArray[version] + '</option>');
//     }
//     $("#versions").css("display", "block");
//     $("#versions").val(docObject.version).prop('selected', true);
//     var newestVerion = $("#versions option:first-child").attr("value");

//     $("#versions").unbind();
//     $("#versions").change(function () {

//         var pathArray = window.location.href.split('/');
//         var shortPath = '/' + pathArray[pathArray.length - 2] + '/' +
//             pathArray[pathArray.length - 1];
//         window.location.href = window.location.origin + "/" + this.value + shortPath;
//         /*
//         if (this.value == newestVerion) {
//             window.location.href = window.location.origin + shortPath;
//         } else {
//             window.location.href = window.location.origin + "/" + this.value + shortPath;
//         }*/
//     });
// });
