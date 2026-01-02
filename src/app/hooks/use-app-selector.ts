import { useSelector } from "react-redux";
import { RootState } from "../lib/redux";

export const useAppSelector = useSelector.withTypes<RootState>();