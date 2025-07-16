window.getSelectionStart = (element) => {
    return element.selectionStart;
}

window.getCaretCoordinates = function (textArea) {
    const { selectionStart } = textArea;
    const div = document.createElement("div");
    const span = document.createElement("span");
    const style = window.getComputedStyle(textArea);

    for (const prop of style) {
        div.style[prop] = style[prop];
    }

    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.whiteSpace = "pre-wrap";
    div.style.wordWrap = "break-word";
    div.style.overflowWrap = "break-word";
    div.style.width = textArea.offsetWidth + "px";
    div.style.height = textArea.offsetHeight + "px";

    const textBeforeCaret = textArea.value.substring(0, selectionStart);
    const textAfterCaret = textArea.value.substring(selectionStart);
    span.textContent = "\u200b";
    div.textContent = textBeforeCaret;
    div.appendChild(span);

    document.body.appendChild(div);
    const rect = span.getBoundingClientRect();
    const taRect = textArea.getBoundingClientRect();
    document.body.removeChild(div);

    return {
        top: rect.top - taRect.top + textArea.scrollTop,
        left: rect.left - taRect.left + textArea.scrollLeft
    };
};