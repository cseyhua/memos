type ResponseRaw<T> = {
  isSuccess: boolean
  message: string,
  data?: T 
}

const customFetch = async function <T>(promise: Promise<Response>) {
  try {
    const res = await promise
    if (res.status < 300)
      return Promise.resolve<ResponseRaw<T>>({
        isSuccess: true,
        message: res.statusText,
        data: (await res.json()) as T
      })
    return Promise.resolve<ResponseRaw<T>>({ isSuccess: false, message: res.statusText })
  } catch (err: any) {
    return Promise.resolve<ResponseRaw<T>>({ isSuccess: false, message: err.toString() })
  }
}


