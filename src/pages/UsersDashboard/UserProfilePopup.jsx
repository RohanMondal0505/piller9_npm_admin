import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import styles from "./UserProfilePopup.module.scss";

const UserProfilePopup = ({ setOpenUserProfile }) => {
	return (
		<>
			<div className={styles.UserProfilePopup} onClick={() => setOpenUserProfile(false)}>
				<div className={styles.Wrapper} onClick={(e) => e.stopPropagation()}>
					<div className={styles.Profile}>
						<img src="https://picsum.photos/50/50" alt="" />
						<div className={styles.Details}>
							<h3>{"Arjan pawar"}</h3>
							<p>{"@username1"}</p>
							<div className={styles.Type}>
								<span></span>
								<p>Editor</p>
							</div>
						</div>
					</div>

					<div className={styles.PersonalDetails}>
						<h3>Personal Details</h3>
						<div className={styles.Details}>
							<div className={styles.Left}>
								<div className={styles.InputWrapper}>
									<label htmlFor="">Name</label>
									<input type="text" placeholder="Name" value={"Archha sharma"} />
								</div>
								<div className={styles.InputWrapper}>
									<label htmlFor="">Username</label>
									<input type="text" placeholder="User name" value={"Archhasharma5556"} />
								</div>
								<div className={styles.InputWrapper}>
									<label htmlFor="">Phone Number</label>
									<input type="text" placeholder="Phone" value={"9889XX5665"} />
								</div>
								<div className={styles.InputWrapper}>
									<label htmlFor="">Email</label>
									<input type="text" placeholder="Email Id" value={"archhasharma@gmail.com"} />
								</div>
							</div>
							<div className={styles.Right}>
								<div className={styles.InputWrapper}>
									<label htmlFor="">Address</label>
									<input type="text" placeholder="Address" value={"Delji noida"} />
								</div>

								<div className={styles.Row}>
									<div className={styles.InputWrapper}>
										<label htmlFor="">Country</label>
										<input type="text" placeholder="Country" value={"India"} />
									</div>
									<div className={styles.InputWrapper}>
										<label htmlFor="">City</label>
										<input type="text" placeholder="City" value={"Kolkata"} />
									</div>
								</div>
								<div className={styles.Row}>
									<div className={styles.InputWrapper}>
										<label htmlFor="">Pin code</label>
										<input type="text" placeholder="pin code" value={"738281"} />
									</div>
									<div className={styles.InputWrapper}>
										<label htmlFor="">State</label>
										<input type="text" placeholder="pin code" value={"West Bengal"} />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.ButtonWrapper}>
						<button onClick={() => setOpenUserProfile(false)}>
							<FaAngleLeft color="#4A5154" />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserProfilePopup;
