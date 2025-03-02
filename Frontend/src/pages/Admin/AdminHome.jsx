import React from 'react'
import navItem from './AdminNavItem'
import NavBar from '../../components/NavBar'

function AdminHome() {
  return (
    <>
    <NavBar nav={navItem} />
    <main>
    <h1>Your Admin</h1>
        <section className="main-info-tab">
                            <div className="pic">
                                <div className="dl"><span>Heading</span> <br /> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, itaque.</div>
                                <img  className="head-pic" alt="img1" />
                            </div>
                            <div className="pic">
                                <img  className="head-pic" alt="img2" />
                                <div className="dl"><span>Heading</span> <br /> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, itaque.</div>
                            </div>
                            <div className="pic">
                                <div className="dl"><span>Heading</span> <br /> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, itaque.</div>
                                <img   className="head-pic" alt="img3" />
                            </div>
                        </section>
    </main>
    </>
  )
}

export default AdminHome