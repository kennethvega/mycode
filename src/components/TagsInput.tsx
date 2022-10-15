import styles from "./TagsInput.module.scss";
type TagsInputProps = {
  tags: string[];
  setTags: (val: string[]) => void;
};

const TagsInput = ({ tags, setTags }: TagsInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLInputElement;
    if (!target.value.trim()) return;
    e.preventDefault();
    setTags([...tags, target.value]);
    target.value = "";
  };
  const removeTag = (index: number) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  return (
    <div className={styles["tags-input-container"]}>
      {tags?.map((tag, index) => {
        return (
          <div className={styles["tag-item"]} key={index}>
            <>
              <span className={styles.text}>{tag}</span>
              <span className={styles.close} onClick={() => removeTag(index)}>
                &times;
              </span>
              {console.log(tags)}
            </>
          </div>
        );
      })}
      {tags.length <= 3 ? (
        <input
          onKeyDown={handleKeyDown}
          type="text"
          className={styles.input}
          placeholder="Add tags..."
        />
      ) : (
        <input
          onKeyDown={handleKeyDown}
          type="text"
          className={styles.input}
          placeholder="tags are limited to 4"
          disabled
        />
      )}
    </div>
  );
};
export default TagsInput;
