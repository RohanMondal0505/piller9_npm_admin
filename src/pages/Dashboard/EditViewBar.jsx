import React, { useRef, useState } from "react";
import styles from "./EditViewBar.module.scss";

const EditViewBar = ({ setViewBarEditPopup, currentData, onUpdate }) => {
	const iconRef = useRef(null);
	const [title, setTitle] = useState(currentData.title || "");
	const [icon, setIcon] = useState(currentData.icon || "");
	const [file, setFile] = useState("");

	const handleIconChange = (e) => {
		const uploadedFile = e.target.files[0];
		if (uploadedFile) {
			const iconURL = URL.createObjectURL(uploadedFile);
			setIcon(iconURL);
			setFile(uploadedFile);
		}
	};

	const handleSubmit = () => {
		const updatedData = { title, icon, file };
		onUpdate(updatedData);
		setViewBarEditPopup(false);
	};

	return (
		<div className={styles.EditViewBarPopup} onClick={() => setViewBarEditPopup(false)}>
			<div className={styles.Wrapper} onClick={(e) => e.stopPropagation()}>
				<div>
					<h2>Edit View Bar</h2>
					<p>Update the title and icon for this view bar.</p>
				</div>

				<div className={styles.InputWrapper}>
					<label htmlFor="Title">Title</label>
					<input type="text" placeholder="Enter Title" id="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div className={styles.IconWrapper}>
					<div className={styles.Left}>
						<label htmlFor="Icon">Icon</label>
						<div className={styles.ImageContainer}>
							<img src={icon || ""} alt="Icon" height={"100%"} width={"100%"} title="icon" loading="lazy" />
						</div>
					</div>
					<input type="file" ref={iconRef} style={{ display: "none" }} onChange={handleIconChange} />
					<button onClick={() => iconRef.current.click()}>Change Icon</button>
				</div>

				<button onClick={handleSubmit} className={styles.Save}>
					Update
				</button>
			</div>
		</div>
	);
};

export default EditViewBar;
