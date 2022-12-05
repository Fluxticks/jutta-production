const charCount = (string) => {
  return [...string].length;
};

const getTextParts = (firstText, secondText, maxLength = 27) => {
  if (charCount(firstText) + charCount(secondText) < maxLength) {
    return [firstText + secondText, undefined];
  } else if (secondText.includes("&")) {
    const parts = secondText.split("&");
    if (charCount(firstText) + charCount(parts[0]) < maxLength) {
      return [firstText + parts[0] + " &", parts[1]];
    }
  }
  return [firstText, secondText];
};

const updateBarPosition = (activeStyle, barRef, useOffset = true) => {
  const activeChildren = document.getElementsByClassName(activeStyle);

  if (!activeChildren.length) {
    return;
  } else {
    var activeChild = activeChildren[0];
  }

  const itemBounds = activeChild.getBoundingClientRect();
  const top = useOffset
    ? activeChild.offsetTop + itemBounds.height
    : itemBounds.top + itemBounds.height;
  const newStyle = {
    display: "block",
    left: `${itemBounds.left}px`,
    top: `${top}px`,
    width: `${itemBounds.width}px`,
  };
  Object.assign(barRef.current.style, newStyle);
};

export { charCount, getTextParts, updateBarPosition };
