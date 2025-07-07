const Note = require("../models/Note")

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createNote = async (req, res) => {
  try {
    const { title, content, category, tags, isFinancial, amount, transactionType, color } = req.body

    const note = new Note({
      user: req.user.id,
      title,
      content,
      category,
      tags,
      isFinancial,
      amount,
      transactionType,
      color,
    })

    const createdNote = await note.save()
    res.status(201).json(createdNote)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.json(updatedNote)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" })
    }

    await Note.findByIdAndDelete(req.params.id)
    res.json({ message: "Note removed" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getBudgetSummary = async (req, res) => {
  try {
    const financialNotes = await Note.find({
      user: req.user.id,
      isFinancial: true,
    })

    const totalIncome = financialNotes
      .filter((note) => note.transactionType === "income")
      .reduce((sum, note) => sum + note.amount, 0)

    const totalExpenses = financialNotes
      .filter((note) => note.transactionType === "expense")
      .reduce((sum, note) => sum + note.amount, 0)

    const balance = totalIncome - totalExpenses

    res.json({
      totalIncome,
      totalExpenses,
      balance,
      currency: "₹",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getBudgetSummary,
}
