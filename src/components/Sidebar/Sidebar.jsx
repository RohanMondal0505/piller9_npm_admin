import ls from "localstorage-slim";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import LogoutWhite from "../../assets/images/LogoutWhite.webp";
import LogoutYellow from "../../assets/images/LogoutYellow.webp";
import MenuWhite from "../../assets/images/MenuWhite.webp";
import MenuYellow from "../../assets/images/MenuYellow.webp";
import RequestWidgetWhite from "../../assets/images/WidgetWhite.webp";
import RequestWidgetYellow from "../../assets/images/WidgetYellow.webp";
import LineAsset from "../../assets/svg/LineAsset.svg?react";
import styles from "./Sidebar.module.scss";

const Header = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const sidebarItems = [
		{
			name: "Dashboard",
			Url: "/admin/dashboard",
			icon: MenuWhite,
			activeIcon: MenuYellow,
			onClick: () => console.log("clicked"),
		},
		{
			name: "Users Dashboard",
			Url: "/admin/users-dashboard",
			icon: MenuWhite,
			activeIcon: MenuYellow,
		},
		{
			name: "Widget Requests",
			Url: "/admin/widget-requests",
			icon: RequestWidgetWhite,
			activeIcon: RequestWidgetYellow,
		},
		{
			name: "Logout",
			Url: "/",
			icon: LogoutWhite,
			activeIcon: LogoutYellow,
			onClick: () => {
				ls.clear();
			},
		},
	];
	return (
		<div className={styles.Sidebar}>
			<div className={styles.Logo}>
				<img src={Logo} alt="Logo" title="Logo" height={"100%"} width={"100%"} loading="eager" />
			</div>
			<div className={styles.LineAsset}>
				<span>
					<LineAsset />
				</span>
			</div>

			{sidebarItems?.map((item, index) => (
				<a
					onClick={() => {
						if (item?.Url) navigate(item?.Url);
						if (item?.onClick) item?.onClick();
					}}
					className={pathname === `${item?.Url}` ? styles.active : ""}
					key={index}
				>
					<span>{pathname === `${item?.Url}` ? <img src={item?.activeIcon} alt="" /> : <img src={item?.icon} alt="" />}</span>
					{item?.name}
				</a>
			))}
		</div>
	);
};

export default Header;
