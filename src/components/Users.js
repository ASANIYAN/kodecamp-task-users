import { useEffect, useState } from "react";

const Users = () => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch('https://jsonplaceholder.typicode.com/users', {signal: abortCont.signal })
        .then(res => {
            if (!res.ok) {
                throw Error('Could not fetch the data for that resource');
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
        }).catch(err => {
          if (err.name === 'AbortError') {
              console.log('fetch aborted');
          } else {
            setIsPending(false);
            setError(err.message);
          }
      })
        return () => abortCont.abort();

    }, [])

    return (
        <div className="container mx-auto">
            { isPending && <div> Loading... </div> }
            { error && <div> {error.message} </div> }
            { data && data.map((each) => (
                    <div className="container mx-auto mt-10 bg-background lg:w-3/5 sm:mt-12 sm:h-96 md:h-80"  key={each.id}>
                        <div className="container mx-auto">
                            <h1 className="text-5xl font-bold text-heading text-center pt-2">
                                {
                                    each.name
                                }
                            </h1>
                            <div className="container mx-auto mt-3">
                                <p className="text-paragraph text-center px-3">
                                    I'm a digital designer in love with photography painting and discovering new worlds and cultures
                                </p>
                            </div>
                            <div className="container mx-auto mt-6">
                                <h2 className="text-2xl text-heading font-semibold text-center">
                                    General Info
                                </h2>
                                <p className="text-center flex justify-between mt-3 sm:w-full md:w-96 mx-auto text-paragraph">
                                    <span className="font-medium text-heading text-left">
                                        Date of Birth
                                    </span>
                                    <span className="pl-16">
                                        Aug 25, 1983
                                    </span>
                                </p>
                                <p className="text-center flex justify-between mt-3 sm:w-full md:w-96 mx-auto text-paragraph">
                                    <span className="font-medium text-heading text-left">
                                        Address
                                    </span>
                                    <span className="pl-16">
                                        <span className="pl-4">
                                            {
                                                each.address.street + ", " + each.address.city
                                            }
                                        </span>
                                    </span>
                                </p>
                                <p className="text-center flex justify-between mt-3 sm:w-full md:w-96 mx-auto text-paragraph">
                                    <span className="font-medium text-heading text-left">
                                        E-mail
                                    </span>
                                    <span className="pl-16">
                                        {
                                            each.email
                                        }
                                    </span>
                                </p>
                                <p className="text-center flex justify-between mt-3 sm:w-full md:w-96 mx-auto text-paragraph">
                                    <span className="font-medium text-heading text-left">
                                        Phone
                                    </span>
                                    <span className="pl-16">
                                        {
                                            each.phone
                                        }
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                        )) }
        </div>

    );
}

export default Users;