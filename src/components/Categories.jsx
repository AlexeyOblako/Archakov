
import React from 'react';

function Categories({value, onClickCategory}) {


    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']



    return (
        <div className="categories">
            <ul>
                {categories.map((catergoryName, i) =>
                    <li key={i} onClick={() =>
                        onClickCategory(i)}
                        className={value === i ? 'active' : ''}>{catergoryName}</li>)}
            </ul>
        </div>
    )
}

export default Categories;