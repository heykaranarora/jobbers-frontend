import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SiteNavbar from './SiteNavbar'


const StudentDetails = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jobportal-backend-psrc.onrender.com/api/v1/admin/getallusers",
        {
          method: "GET",
          credentials: "include",
        }
      )
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }
      const data = await response.json()
      setUsers(data.users)
      // console.log(data.users.lastLogin);
      
      
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `https://jobportal-backend-psrc.onrender.com/api/v1/admin/deleteuser/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
      if (!response.ok) {
        throw new Error("Failed to delete user")
      }
      setUsers(users.filter((user) => user._id !== userId))
    } catch (error) {
      alert("Failed to delete user")
    }
  }

  const handleBlock = async (userId) => {
    try {
      const response = await fetch(
        `https://jobportal-backend-psrc.onrender.com/api/v1/admin/blockuser/${userId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      )
      if (!response.ok) {
        throw new Error("Failed to block user")
      }

      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, Blocked: true } : user
        )
      )
    } catch (error) {
      alert("Failed to block user")
    }
  }

  const handleUnblock = async (userId) => {
    try {
      const response = await fetch(
        `https://jobportal-backend-psrc.onrender.com/api/v1/admin/unblockuser/${userId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      )
      if (!response.ok) {
        throw new Error("Failed to unblock user")
      }

      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, Blocked: false } : user
        )
      )
    } catch (error) {
      alert("Failed to unblock user")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>
  }

  const students = users.filter((user) => user.role === "student")
  // students.forEach(user => {
  //   console.log(`User: ${students.fullname}, Last Login: ${students.lastLogin}`);
  // });

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteNavbar />
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <h2 className="text-xl flex justify-center mb-6">Students</h2>
        <Table>
          <TableCaption>A list of all students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <Badge variant={user.Blocked ? "destructive" : "success"}>
                    {user.Blocked ? "Blocked" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-100 "
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                  {user.Blocked ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-100"

                      onClick={() => handleUnblock(user._id)}
                    >
                      Unblock
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-100"

                      onClick={() => handleBlock(user._id)}
                    >
                      Block
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default StudentDetails

