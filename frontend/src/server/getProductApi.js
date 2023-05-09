import axios from 'axios'
import { getCookie } from '../utils/getCookie'

export function createGetProductApi() {
    return async function service(productId) {
      try {
        const result = await axios({
            url: `/api/products/${productId}`,
            method: 'GET',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        return result.data
      } catch (e) {
        console.log(e)
        throw new Error()
      }
    }
  }