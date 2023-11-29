import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      console.log(
        "replace the toDo in the Index",
        targetIndex,
        "with",
        newToDo
      );
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ""} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={onClick}>
          Done
        </button>
      )}
      <button>Delete</button>
    </li>
  );
}

// function ToDo({ text, category }: IToDo) {
//   const onClick = (newCategory: IToDo["category"]) => {};
//   return (
//     <li>
//       <span>{text}</span>
//       {category !== "DOING" && (
//         <button onClick={() => onClick("DOING")}>Doing</button>
//       )}
//       {category !== "TO_DO" && (
//         <button onClick={() => onClick("TO_DO")}>To Do</button>
//       )}
//       {category !== "DONE" && (
//         <button onClick={() => onClick("DONE")}>Done</button>
//       )}
//     </li>
//   );
// }
export default ToDo;
