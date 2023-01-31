export const likeTweetLocal = (id: string | null): void => {
  if (id) {
    let storedIds = JSON.parse(localStorage.getItem("ids") || "") || [];

    let index = storedIds.indexOf(id);

    if (index > -1) {
      storedIds.splice(index, 1);
      localStorage.setItem("ids", JSON.stringify(storedIds));
      return;
    }

    storedIds.push(id);

    localStorage.setItem("ids", JSON.stringify(storedIds));
  } else {
    console.log("Id tweet not found");
  }
};
