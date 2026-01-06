import { FileTreeElement, findTreeElementById } from "@/app/components/CompactEditorFileTree";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FileTreeState {
    rootPath: string;
    elements: FileTreeElement[];
}

const initialState: FileTreeState = {
    elements: [],
    rootPath: ""
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
        }
    }
});

export const { setFileTreeState, setFileTreeChildren } = fileTreeSlice.actions;

export default fileTreeSlice.reducer;