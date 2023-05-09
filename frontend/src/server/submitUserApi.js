import axios from 'axios'
import { getCookie } from '../utils/getCookie'

export function createSubmitUserApi() {
    return async function service(data) {
      try {
        const result = await axios({
            url: `/api/users/`,
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            data
        })
        return result.data
      } catch (e) {
        console.log(e)
        throw new Error()
      }
    }
  }