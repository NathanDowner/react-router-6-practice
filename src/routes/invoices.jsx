import * as React from 'react';
import {
  NavLink,
  Outlet,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { getInvoices } from '../data';

function QueryNavLink({ to, ...props }) {
  const locaiton = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Invoices() {
  const invoices = getInvoices();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(ev) {
    const filter = ev.target.value;
    if (filter) {
      setSearchParams({ filter });
    } else {
      setSearchParams({});
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const name = invoice.name.toLocaleLowerCase();
    const filter = searchParams.get('filter');
    if (!filter) return true;
    return name.startsWith(filter.toLocaleLowerCase());
  });

  return (
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          borderRight: 'solid 1px',
          padding: '1rem',
        }}
      >
        <input
          value={searchParams.get('filter') || ''}
          onChange={handleChange}
        />
        {filteredInvoices.map((invoice) => (
          <QueryNavLink
            style={({ isActive }) => {
              return {
                display: 'block',
                margin: '1rem 0',
                color: isActive ? 'red' : '',
              };
            }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </QueryNavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
