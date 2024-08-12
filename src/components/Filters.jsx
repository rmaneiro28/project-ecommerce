import SearchIcon from "./../assets/SearchIcon.svg";
import "../hooks/useFilters.js";
import { Productos } from "./../data/data.js";

export function Filters() {
    const categories = Productos.categories;

    return (
        <section className="filters">
            <div className="filters-search">
                <h2 className="filters-title">Filtros</h2>
                <div type="text" className="filters-search-bar">
                    <img src={SearchIcon} alt="" />
                    <input type="text" name="" id="search" placeholder="Buscar producto..." />
                </div>

            </div>
            <div className="filters-categories">
                <h3>Categorías</h3>
                <div className="categories">
                    {categories.map(category => (
                        <button key={category.id} className="category" category={category.category}>
                            <p className="category-text">{category.category.toUpperCase()}</p>
                        </button>
                    ))}
                </div>
            </div>
        </section >
    )
}