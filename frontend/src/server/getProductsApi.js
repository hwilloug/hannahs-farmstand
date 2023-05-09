import axios from 'axios'
import { getCookie } from '../utils/getCookie'

export function createGetProductsApi() {
    return async function service() {
      try {
        const result = await axios({
            url: `/api/products/`,
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