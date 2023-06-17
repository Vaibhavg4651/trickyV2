/* eslint-disable newline-before-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createConnection from 'db-init/dbConn'
import Blog from 'db-init/models/blogs'
import authToken from 'middlewares/auth'

const getBlogById = async (req, res) => {
  try {
    if (req.method == 'GET') {
      if (authToken(req, res)) {
        const { blogId } = req.query

        if (!blogId) {
          res.status(400).json({
            error: 'blogId is required to process this request.'
          })
        }

        let blog = await Blog.findOne({ blogId: blogId })
        if (blog) {
          res.status(200).json({ success: `Blog found with blogId ${blogId}`, data: blog })
        } else {
          res.status(400).json({ success: false, error: `No blog found with blogId ${blogId}` })
        }
      }
    } else {
      res.status(400).json({
        error: 'This method is not allowed'
      })
    }
  } catch (err) {
    return res.status(400).json({
      error: `${JSON.stringify(err)}\n${err}`
    })
  }
}

export default createConnection(getBlogById)