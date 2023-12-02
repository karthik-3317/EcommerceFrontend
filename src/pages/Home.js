import React, { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import BlogCard from '../components/BlogCard'
import ProductCard from '../components/ProductCard'
import SpecialProduct from '../components/SpecialProduct'
import Meta from '../components/Meta'
import services from '../utils/Data'
import categories from '../static/CategoriesData'
import { Col, Row } from 'react-bootstrap';
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from '../features/blogs/blogSlice'
import LoadingPage from '../components/Loading'
import moment from 'moment'
import { getProducts } from '../features/products/productSlice'
import SwiperContainer from '../components/SwiperContainer'
const Home = () => {


  const dispatch = useDispatch()
  const {FetchedBlogs} = useSelector(state=>state.blogs)

  const [blogs,setBlogs] = useState(null)

  
  useEffect(()=>{
    dispatch(getAllBlogs())
  },[])
  
  useEffect(()=>{
    setBlogs(FetchedBlogs)
  },[FetchedBlogs])
  
  const [products,setProducts] = useState(null)
  const [filterdPopularProducts,setFilteredPopularProducts] = useState(null)
  const [filterdFeaturedProducts,setFilteredFeaturedProducts] = useState(null)

  const {productList} = useSelector(state=>state.product)

  useEffect(()=>{
    dispatch(getProducts({}))
  },[])

  useEffect(()=>{
    setProducts(productList)
  },[productList])
  
  useEffect(()=>{
    if(Array.isArray(products))
    setFilteredPopularProducts(products?.filter(element=> element?.tags?.includes('Popular')))
  },[products])

  useEffect(()=>{
    if(Array.isArray(products))
    setFilteredFeaturedProducts(products?.filter(element=>element?.tags?.includes('Featured')))
  },[products])


  return (
    <>
     <Meta title="Home"/>
     <div class1="home-wrapper-1 py-5">
     <div className="row " style={{width:"99.7vw"}}>
          <SwiperContainer/>
     </div>
     </div>

     <Container className="home-wrapper-3 py-5">
      <Row className='py-5'>
        <h1 className='fs-2 fw-bolder my-3'>Categories</h1>
        {categories.map((category, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <div className="categories mb-4" >
              <div className='d-flex align-items-center justify-content-center w-100'>
                <div className="text-center">
                  <h6>{category.title}</h6>
                  <p>{category.count} </p>
                </div>
                <img src={category.image} alt={category.title} className="img-fluid" />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>

     
     
     <Container class1="featured-wrapper py-5 home-wrapper-2">
     <div className="row">
              <div className="col-12">
                <h3 className='section-heading'>Featured Collections</h3>
              </div>
              <ProductCard datalist={filterdFeaturedProducts}/>
            </div>
     </Container>


      {/* <Container class1="famous-wrapper py-5 home-wrapper-2">
      <div className="row ">
            <div className="col-3 ">
              <div className="famous-card position-relative">
                <img src="images/famous-01.avif" className='img-fluid' style={{mixBlendMode:"multiply"}} alt="" />
                <div className="famous-content position-absolute">
                <h5 className='text-white'>Big Screen</h5>
                <h6 className='text-white'>Smart Analog Series 7</h6>
                <p className='text-white'>From &#8377;500 or &#8377; 100/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>
            <div className="col-3 ">
              <div className="famous-card position-relative">
                <img src="images/famous-01.avif" className='img-fluid' style={{mixBlendMode:"multiply"}} alt="" />
                <div className="famous-content position-absolute">
                <h5 className='text-white'>Big Screen</h5>
                <h6 className='text-white'>Smart Analog Series 7</h6>
                <p className='text-white'>From &#8377;500 or &#8377; 100/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>
            <div className="col-3 ">
              <div className="famous-card position-relative">
                <img src="images/famous-01.avif" className='img-fluid' style={{mixBlendMode:"multiply"}} alt="" />
                <div className="famous-content position-absolute">
                <h5 className='text-white'>Big Screen</h5>
                <h6 className='text-white'>Smart Analog Series 7</h6>
                <p className='text-white'>From &#8377;500 or &#8377; 100/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>
            <div className="col-3 ">
              <div className="famous-card position-relative">
                <img src="images/famous-01.avif" className='img-fluid' style={{mixBlendMode:"multiply"}} alt="" />
                <div className="famous-content position-absolute">
                <h5 className='text-white'>Big Screen</h5>
                <h6 className='text-white'>Smart Analog Series 7</h6>
                <p className='text-white'>From &#8377;500 or &#8377; 100/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>
          </div>
      </Container> */}

      <Container class1="special-wrapper py-5 home-wrapper-2">
      <div className="row">
            <div className="col-12">
              <h3 className='section-heading'>Special Products</h3>
            </div>
            <div className="row">
                {products === null ? (
                    <LoadingPage height={'40vh'} />
                  ) : Array.isArray(products) && products?.map((element, i) => {
                    if (element?.tags?.includes('Special')) {
                      return (
                          <SpecialProduct
                          className="mb-2" 
                            title={element?.title}
                            brand={element?.brand}
                            price={element?.price}
                            image={element?.images[0]?.url}
                            rating={element?.totalrating.toString()}
                            quantity={element?.quantity}
                            sold={element?.sold}
                          />
                      );
                    }
                    return ""; 
                  })}
                </div>
          </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">
      <div className="row">
              <div className="col-12">
                <h3 className='section-heading'>Popular Collections</h3>
              </div>
            </div>
            <div className="row">
            {
                 filterdPopularProducts === null ? <LoadingPage  height={"40vh"}/> : Array.isArray(filterdPopularProducts) && <ProductCard datalist={filterdPopularProducts}/>
            }
            </div>
      </Container>

      <Container class1="marque-wrapper py-5">
      <div className="row">
              <div className="col-12">
                <div className='marquee-inner-wrapper card-wrapper'>
                <Marquee className='d-flex'>
                  <div className='mx-4 w-25'><img src="images/brand-01.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-02.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-03.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-04.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-05.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-06.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-07.png" alt="brand" /></div>
                </Marquee>
                </div>
              </div>
            </div>
      </Container>
      
      
      <Container class1="blog-wrapper py-5 home-wrapper-2">
      <div className="row">
              <div className="col-12">
                <h3 className='section-heading'>Our Latest Blogs</h3>
              </div>
                {
                  blogs === null ? <LoadingPage height={"400px"}/> : Array.isArray(blogs) && blogs?.map((element,i)=>{
                    return <BlogCard title={element?.title} descrpition={element?.description} category={element?.category} id={element?._id} image ={element?.images[0]?.url}  date={moment(element?.createdAt).format("MMMM Do YYYY, h:mm a")} key={i}/>
                  })
                }
            </div>
      </Container>


      <Container className="home-wrapper-2" style={{marginBottom:"20px"}}>
      <div className="row justify-content-center">

          <h1 className='fs-2 fw-bolder my-3'>Information</h1>

        {services.map((service, index) => (
          <Col key={index} className="col-12 col-md-6 col-lg-4">
            <div className="services d-flex align-items-center flex-column flex-md-row gap-15 py-5">
              <img src={service.image} alt="services" className="img-fluid" />
              <div>
                <h6>{service.title}</h6>
                <p className="mb-0">{service.tagline}</p>
              </div>
            </div>
          </Col>
        ))}
      </div>
    </Container>
     
    </>
  )
}

export default Home