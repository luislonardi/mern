import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

const getAllJobs = async (req, res) => {
  console.log(req);
  const allJobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ allJobs });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const { company, position, createdBy } = req.body;
  req.body.createdBy = req.user.userId;
  const job = await Job.create({ company, position, createdBy });
  res.status(StatusCodes.CREATED).json({ job });
};

const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ job: updatedJob });
};

const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ job: removedJob });
};

export { getAllJobs, createJob, getJob, updateJob, deleteJob };
