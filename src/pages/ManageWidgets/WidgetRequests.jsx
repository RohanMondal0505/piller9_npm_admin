import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../components/Hooks/axios";
import { formatTimestamp } from "../../components/utils/HelperFunctions";
import { setOpenLoadingPopup } from "../../redux/slice/tempSlice";
import styles from "./WidgetRequests.module.scss";

const WidgetRequests = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [requestCount, setRequestCount] = useState(0);

	const [requests, setRequest] = useState([]);

	useEffect(() => {
		dispatch(setOpenLoadingPopup(true));
		axios
			.get(`/requestWidgets/getAll?page=${page}&limit=${limit}`)
			.then(({ data }) => {
				setRequest(data?.groupedRequests);
				setRequestCount(data?.totalUsers);
			})
			.catch((err) => {
				toast.error(err?.response?.data?.message || "Error Loading Requests...");
			})
			.finally(() => dispatch(setOpenLoadingPopup(false)));
	}, [page, limit]);

	//users requests page

	const handleOpenUserRequest = (data) => {
		navigate(`/admin/manage-user-widgets`, {
			state: {
				requests: data?.requests,
				userDetails: data?.userDetails,
			},
		});
	};
	return (
		<div className={styles.WidgetRequests}>
			<div className={styles.DashboardTable}>
				<div className={styles.Filters}>
					<div className={styles.SearchWrapper}>
						<BiSearch />
						<input type="search" name="" id="" placeholder="Search for User" />
					</div>
				</div>
				<div className={styles.Headings}>
					<div>User Name</div>
					<div>Email</div>
					<div>Last Requested On</div>
					<div>No. of Request</div>
					<div>View</div>
				</div>
				<div className={styles.WidgetCards}>
					{requests?.map((data) => {
						return (
							<div className={styles.Card} key={data._id} onClick={() => handleOpen(data)}>
								<div className={styles.NamePic}>
									<img src={data?.userDetails?.profilePic} alt=" " height={"100%"} width={"100%"} loading="lazy" title=" " />
									{data?.userDetails?.name}
								</div>
								<div>{data?.userDetails?.email}</div>
								<div>{formatTimestamp(data?.requests[0]?.createdAt)}</div>
								<div>{data?.totalRequests}</div>
								<div>
									<BsEyeFill onClick={() => handleOpenUserRequest(data)} />
								</div>
							</div>
						);
					})}
				</div>
				<div className={styles.SupportFooter}>
					<p>{`Showing ${requests?.length} of ${requestCount} users in page ${1} `}</p>
					<div className={styles.pageButtons}>
						<button
							className={styles.leftArrow}
							disabled={page === 1}
							onClick={() => {
								setPage(page - 1);
							}}>
							{<FaArrowLeft />}
						</button>

						<p>{page}</p>

						<button
							disabled={page === Math.ceil(requestCount / limit) || Math.ceil(requestCount / limit) < 2}
							onClick={() => {
								setPage(page + 1);
							}}>
							{<FaArrowRight />}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WidgetRequests;
