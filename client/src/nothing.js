import React from 'react'

const nothing = () => {
  return (
    <div>
         <div className='container mt-5'>
                <form className='mt-4'>
                    <div className='row'>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputEmail1" className="form-label">category</label>
                            <input type="text" value={inpVal.category} onChange={setData} name='category' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputEmail1" className="form-label">Project Name</label>
                            <input type="text" value={inpVal.projectName} onChange={setData} name='projectName' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Techstack</label>
                            <input type="text" value={inpVal.Tstack} onChange={setData} name='Tstack' className="form-control" id="exampleInputPassword1" />
                        </div>

                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Live link</label>
                            <input type="text" value={inpVal.Llink} onChange={setData} name='Llink' className="form-control" id="exampleInputPassword1" />
                        </div>

                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Demo link</label>
                            <input type="text" value={inpVal.Dlink} onChange={setData} name='Dlink' className="form-control" id="exampleInputPassword1" />
                        </div>

                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Isapp</label>
                            <input type="text" value={inpVal.Isapp} onChange={setData} name='Isapp' className="form-control" id="exampleInputPassword1" />
                        </div>

                       

                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">date</label>
                            <input type="date" value={inpVal.Ldate} onChange={setData} name='Ldate' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Play Store</label>
                            <input type="text" value={inpVal.psl} onChange={setData} name='psl' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Apple Store</label>
                            <input type="text" value={inpVal.asl} onChange={setData} name='asl' className="form-control" id="exampleInputPassword1" />
                        </div>

                        <div className="mb-3 mb-3 col-lg-12 col-md-12 col-12">
                            <label for="exampleInputPassword1" className="form-label">Description</label>
                            <textarea name='desc' value={inpVal.desc} onChange={setData} className='form-control' id='' cols='30' rows='5'></textarea>
                        </div>

                        <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default nothing