import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Dropdown} from "react-bootstrap";

const SortParamBar = () => {
    const {product} = useContext(Context)


    return (
        <Dropdown className="d-flex justify-content-center align-items-center">
            <Dropdown.Toggle>{product.selectedSort.name || "Sort by..."}</Dropdown.Toggle>
            <Dropdown.Menu>
                {product.sortParams.map(selectedSort =>
                    <Dropdown.Item
                        onClick={(e) => {product.setSelectedSort(selectedSort);}}
                        key={selectedSort._id}
                    >
                        {selectedSort.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default observer(SortParamBar);