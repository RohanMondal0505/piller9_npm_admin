# Demo variables

```
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDU3MjM1YTRlMjBkNDUxZTZmY2Q4YiIsImV4cCI6MTc2OTI0OTMxMSwiaWF0IjoxNzM3NzEzMzExfQ.pcjSLKir1PwNDDvu15s7SQZkHPJE5wRZlTpt0EtGKZs";
const adminData = {
	_id: "67457235a4e20d451e6fcd8b",
	name: "Super Admin",
	email: "superadmin@gmail.com",
	profilePic:
		"https://firebasestorage.googleapis.com/v0/b/princecollege-b5027.appspot.com/o/Pilar9%2FSuper%20Admins%20Profile%2Fdownload1.jpeg.jpeg?alt=media&token=87ca67ba-229c-4431-951c-2c6f3e6630ea",
	password: "$2a$08$hYGuk3BJOlKP/nv64ZtXXeL4fYSmY2A9Dl3kL.IjKq9yK0wRBj1nK",
	isActive: true,
	isDeleted: false,
	createdAt: "2024-11-26T07:01:09.997Z",
	updatedAt: "2024-11-26T07:01:09.997Z",
	__v: 0,
};

const X_API_KEY = "Your Api Key";
const API_BASE_URL = "https://pilar9-backend.vercel.app";
```

```
import ls from "localstorage-slim"; // import this

<!--  login time set this value -->
ls.set("Pilar9_Token_npm_ls", token);
ls.set("Pillar9_user_npm_ls", user);
ls.set("X_API_KEY", X_API_KEY);
ls.set("API_BASE_URL", API_BASE_URL);

```

# Import like this & use

```
import Admin from "piller9_npm_admin";

const Component = () => {

	return (
		<>
			<Admin token={token} adminData={adminData} X_API_KEY={X_API_KEY} API_BASE_URL={API_BASE_URL} />
		</>
	);
};

export default Component;

```

# Use this dependencies & devDependencies in your react vite code 
```
"dependencies": {
		"@reduxjs/toolkit": "^2.2.6",
		"@vitejs/plugin-react-swc": "^3.7.1",
		"axios": "^1.7.2",
		"jspdf": "^2.5.2",
		"jspdf-autotable": "^3.8.4",
		"localstorage-slim": "^2.7.1",
		"react": "^18.3.1",
		"react-csv": "^2.2.2",
		"react-dom": "^18.3.1",
		"react-grid-layout": "^1.5.0",
		"react-icons": "^5.3.0",
		"react-loader-spinner": "^6.1.6",
		"react-redux": "^9.1.2",
		"react-router-dom": "^6.24.0",
		"react-toastify": "^10.0.5",
		"sass": "^1.77.6",
		"vite-plugin-svgr": "^4.3.0"
	},
	"devDependencies": {
		"@types/react": "^18.3.3",
		"@types/react-dom": "^18.3.0",
		"@vitejs/plugin-react": "^4.3.1",
		"eslint": "^8.57.0",
		"eslint-plugin-react": "^7.34.2",
		"eslint-plugin-react-hooks": "^4.6.2",
		"eslint-plugin-react-refresh": "^0.4.7",
		"vite": "^5.3.1"
	}
```
