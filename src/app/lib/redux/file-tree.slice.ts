import { FileTreeElement, findTreeElementById } from "@/app/components/CompactEditorFileTree";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FileTreeState {
    rootPath: string;
    elements: FileTreeElement[];
    currentFile: FileTreeElement | null;
}

const initialState: FileTreeState = {
    elements: [],
    rootPath: "",
    currentFile: null
};

export const fileTreeSlice = createSlice({
    name: "fileTree",
    initialState: initialState,
    reducers: {
        setFileTreeState: (state, action: PayloadAction<FileTreeState>) => {
            state.elements = action.payload.elements;
            state.rootPath = action.payload.rootPath;
        },
        setFileTreeChildren: (state, action: PayloadAction<{ id: string; children: FileTreeElement[]; }>) => {
            const element = findTreeElementById(action.payload.id, state.elements);
            if (element) {
                element.children = action.payload.children;
            }
        },
        setCurrentFile: (state, action: PayloadAction<FileTreeElement | null>) => {
            state.currentFile = action.payload;
        }
    }
});

export const { setFileTreeState, setFileTreeChildren, setCurrentFile } = fileTreeSlice.actions;

export default fileTreeSlice.reducer;