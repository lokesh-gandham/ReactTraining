import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoveredUpdateId, setHoveredUpdateId] = useState(null);
  const { addToCart } = useCart();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

   const inputRef = useRef(null);



  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('ERROR:', error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getdata();

  }, []);

  useEffect(() => {
  if (!loading && inputRef.current) {
    inputRef.current.focus();
  }
}, [loading]);



  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when search term changes
  }, [searchTerm]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return <div style={{ textAlign: 'center', fontSize: '20px' }}>Loading products...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', fontSize: '20px' }}>{error}</div>;
  }

  return (
    <div>
      <div style={styles.searchContainer}>
        <input
        ref={inputRef}
          type="text"
          placeholder="Search product by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        
        />
      </div>

      <h2 style={{ textAlign: 'center', marginTop: '30px', color: 'orangered' }}>Our Products</h2>

      <div style={styles.cardContainer}>
        {currentItems.length > 0 ? (
          currentItems.map(product => (
            <div key={product.id}
              style={{
                ...styles.card,
                ...(hoveredCardId === product.id ? styles.cardHover : {})
              }}
              onMouseEnter={() => setHoveredCardId(product.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={styles.image}
              />
              <h2 style={styles.title}>{product.name}</h2>
              <p style={styles.description}>{product.description}</p>
              <p style={styles.price}>Price: ₹{product.price}</p>
              <div style={styles.buttonContainer}>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    ...styles.updateBtn,
                    ...(hoveredUpdateId === product.id ? styles.updateBtnHover : {})
                  }}
                  onMouseEnter={() => setHoveredUpdateId(product.id)}
                  onMouseLeave={() => setHoveredUpdateId(null)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: 'red' }}>No matching products found.</p>
        )}
      </div>

      {/* Sticky Pagination Controls */}
      {filteredProducts.length > itemsPerPage && (
        <div style={styles.paginationContainer}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={styles.smallButton}
          >
            ← Previous
          </button>

          <span style={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={styles.smallButton}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  searchInput: {
    width: '60%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
  },
  card: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
    minHeight: '500px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
  },
  cardHover: {
    transform: 'translateY(-6px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#f9f1ff',
    borderColor: '#c084fc',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
  },
  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  title: {
    fontSize: '18px',
    margin: '10px 0 5px'
  },
  description: {
    fontSize: '14px',
    color: '#555'
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#007b00'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  updateBtn: {
    backgroundColor: 'pink',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    minWidth: '80px',
    textAlign: 'center',
    transition: 'all 0.2s ease',
  },
  updateBtnHover: {
    backgroundColor: '#ff69b4',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease',
  },
  paginationContainer: {
    position: 'sticky',
    top: '80px',  // Adjust top value for better visibility
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    zIndex: '1',
    backgroundColor: '#fff',
    padding: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  smallButton: {
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: '#eee',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    minWidth: '80px',
    transition: 'all 0.2s ease',
  },
  pageInfo: {
    fontSize: '14px',
    color: '#555',
  }
};

export default UserDashboard;