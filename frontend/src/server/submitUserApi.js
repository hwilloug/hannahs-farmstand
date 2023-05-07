import axios from 'axios'
import { getCookie } from '../utils/getCookie'

export function createSubmitUserApi() {

    console.log(getCookie('csrftoken'))
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
        console.log(result)
        return result.data
      } catch (e) {
        console.log(e)
        throw new Error()
      }
    }
  }