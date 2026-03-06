import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import AdminLayout from '../../components/AdminLayout';
import './Admin.css';
import './Menus.css';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuForm, setMenuForm] = useState({ name: '', location: 'header', active: true });
  const [itemForm, setItemForm] = useState({
    label: '',
    url: '',
    type: 'link',
    target: '_self',
    parentId: null,
    active: true
  });
  const [editingMenu, setEditingMenu] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    const res = await api.get('/admin/menus');
    setMenus(res.data);
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    if (editingMenu) {
      await api.put(`/admin/menus/${editingMenu}`, menuForm);
    } else {
      await api.post('/admin/menus', menuForm);
    }
    setMenuForm({ name: '', location: 'header', active: true });
    setEditingMenu(null);
    loadMenus();
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMenu) return;

    if (editingItem) {
      await api.put(`/admin/menus/${selectedMenu.id}/items/${editingItem}`, itemForm);
    } else {
      await api.post(`/admin/menus/${selectedMenu.id}/items`, itemForm);
    }
    
    setItemForm({ label: '', url: '', type: 'link', target: '_self', parentId: null, active: true });
    setEditingItem(null);
    loadMenus();
    
    // Reload selected menu
    const res = await api.get(`/admin/menus/${selectedMenu.id}`);
    setSelectedMenu(res.data);
  };

  const handleDeleteMenu = async (id) => {
    if (window.confirm('Xóa menu này?')) {
      await api.delete(`/admin/menus/${id}`);
      if (selectedMenu?.id === id) setSelectedMenu(null);
      loadMenus();
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!selectedMenu || !window.confirm('Xóa menu item này?')) return;
    
    await api.delete(`/admin/menus/${selectedMenu.id}/items/${itemId}`);
    const res = await api.get(`/admin/menus/${selectedMenu.id}`);
    setSelectedMenu(res.data);
    loadMenus();
  };

  const selectMenu = async (menu) => {
    const res = await api.get(`/admin/menus/${menu.id}`);
    setSelectedMenu(res.data);
  };

  const renderMenuItems = (items, level = 0) => {
    const parentItems = items.filter(item => !item.parentId || item.parentId === null);
    
    return parentItems.map(item => {
      const children = items.filter(child => child.parentId === item.id);
      
      return (
        <div key={item.id} style={{ marginLeft: `${level * 20}px` }} className="menu-item-row">
          <div className="menu-item-info">
            <strong>{item.label}</strong>
            <span className="menu-item-url">{item.url}</span>
            <span className="menu-item-type">{item.type}</span>
          </div>
          <div className="menu-item-actions">
            <button onClick={() => {
              setItemForm(item);
              setEditingItem(item.id);
            }}>Sửa</button>
            <button onClick={() => handleDeleteItem(item.id)}>Xóa</button>
          </div>
          {children.length > 0 && (
            <div className="submenu">
              {renderMenuItems(children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <AdminLayout>
      <h1>Quản lý Menu</h1>
      
      <div className="menu-manager">
        <div className="menu-list-section">
          <h2>Danh sách Menu</h2>
          <form onSubmit={handleMenuSubmit} className="admin-form">
            <input
              placeholder="Tên menu"
              value={menuForm.name}
              onChange={e => setMenuForm({...menuForm, name: e.target.value})}
              required
            />
            <select
              value={menuForm.location}
              onChange={e => setMenuForm({...menuForm, location: e.target.value})}
            >
              <option value="header">Header</option>
              <option value="footer">Footer</option>
              <option value="sidebar">Sidebar</option>
            </select>
            <label>
              <input
                type="checkbox"
                checked={menuForm.active}
                onChange={e => setMenuForm({...menuForm, active: e.target.checked})}
              />
              Hoạt động
            </label>
            <button type="submit">{editingMenu ? 'Cập nhật' : 'Tạo menu'}</button>
          </form>

          <div className="menu-list">
            {menus.map(menu => (
              <div
                key={menu.id}
                className={`menu-card ${selectedMenu?.id === menu.id ? 'selected' : ''}`}
                onClick={() => selectMenu(menu)}
              >
                <h3>{menu.name}</h3>
                <p>Vị trí: {menu.location}</p>
                <p>Items: {menu.items?.length || 0}</p>
                <button onClick={(e) => {
                  e.stopPropagation();
                  setMenuForm(menu);
                  setEditingMenu(menu.id);
                }}>Sửa</button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMenu(menu.id);
                }}>Xóa</button>
              </div>
            ))}
          </div>
        </div>

        {selectedMenu && (
          <div className="menu-items-section">
            <h2>Menu Items - {selectedMenu.name}</h2>
            
            <form onSubmit={handleItemSubmit} className="admin-form">
              <input
                placeholder="Nhãn"
                value={itemForm.label}
                onChange={e => setItemForm({...itemForm, label: e.target.value})}
                required
              />
              <input
                placeholder="URL"
                value={itemForm.url}
                onChange={e => setItemForm({...itemForm, url: e.target.value})}
              />
              <select
                value={itemForm.type}
                onChange={e => setItemForm({...itemForm, type: e.target.value})}
              >
                <option value="link">Link</option>
                <option value="category">Danh mục</option>
                <option value="page">Trang</option>
              </select>
              <select
                value={itemForm.target}
                onChange={e => setItemForm({...itemForm, target: e.target.value})}
              >
                <option value="_self">Cùng tab</option>
                <option value="_blank">Tab mới</option>
              </select>
              <select
                value={itemForm.parentId || ''}
                onChange={e => setItemForm({...itemForm, parentId: e.target.value || null})}
              >
                <option value="">-- Menu cha (không có) --</option>
                {selectedMenu.items?.filter(i => !i.parentId).map(item => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
              <button type="submit">{editingItem ? 'Cập nhật' : 'Thêm item'}</button>
              {editingItem && (
                <button type="button" onClick={() => {
                  setItemForm({ label: '', url: '', type: 'link', target: '_self', parentId: null, active: true });
                  setEditingItem(null);
                }}>Hủy</button>
              )}
            </form>

            <div className="menu-items-list">
              {selectedMenu.items && selectedMenu.items.length > 0 ? (
                renderMenuItems(selectedMenu.items)
              ) : (
                <p>Chưa có menu item nào</p>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Menus;
