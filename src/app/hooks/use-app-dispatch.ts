import { useDispatch } from "react-redux"
import { AppDispatch } from "../lib/redux"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()