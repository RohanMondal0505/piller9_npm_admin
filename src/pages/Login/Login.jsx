import ls from "localstorage-slim";
import React, { useEffect, useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginAsset } from "../../assets";
import { Logo } from "../../assets/svg/SvgIndex";
import axios from "../../components/Hooks/axios";
import Loading from "../../components/Loading/Loading";
import { setUser } from "../../redux/slice/userSlice";
import styles from "./Login.module.scss";

const Login = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("superadmin@gmail.com");
	const [password, setPassword] = useState("admin@123");

	const handlePasswordToggle = () => {
		setShowPassword(!showPassword);
	};

	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		axios
			.post(`/admin/login`, { email, password })
			.then(({ data }) => {
				ls.set("Pilar9_Admin_Token", data?.data?.token);
				dispatch(setUser(data?.data?.admin));
				axios.defaults.headers.Authorization = data?.data?.token;
				navigate("/admin/dashboard");
				toast.success("Login Successfully...");
			})
			.catch((err) => {
				toast.error(err?.response?.data?.message || err?.response?.data?.msg || "Failed to Login...");
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		if (ls.get("Pilar9_Admin_Token")) navigate("/admin/dashboard");
	}, []);

	return (
		<div className={styles.Login}>
			<div className={styles.BG}>
				<img src={LoginAsset} alt="Background" width="100%" height="100%" loading="eager" />
			</div>

			<div className={styles.Left}>
				<img src={Logo} alt="Logo" width="100%" height="100%" loading="eager" />
				<h1>Welcome To Super Admin</h1>
			</div>

			{/* Form Section */}
			<form onSubmit={handleSubmit} className={styles.Form}>
				<h2>Sign In</h2>
				<p>Please fill your detail to Sign In your account.</p>
				<div className={styles.InputWrapper}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="example@gmail.com"
						required
					/>
				</div>

				<div className={styles.InputWrapper}>
					<label htmlFor="password">Password</label>
					<div className={styles.PasswordField}>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							required
						/>
						<span onClick={handlePasswordToggle} className={styles.Icon}>
							{showPassword ? <FaRegEyeSlash /> : <FaEye />}
						</span>
					</div>
				</div>

				<div className={styles.RememberMe}>
					<label>
						<input type="checkbox" /> Remember me
					</label>
					<a href="/forgot-password" className={styles.ForgotPassword}>
						Forgot Password?
					</a>
				</div>

				{loading ? (
					<button className={styles.SubmitButton}>
						<Loading color="#fff" />
					</button>
				) : (
					<button type="submit" className={styles.SubmitButton}>
						Sign In
					</button>
				)}
			</form>
		</div>
	);
};

export default Login;
